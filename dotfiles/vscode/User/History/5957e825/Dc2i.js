import {
  Children,
  createElement,
  forwardRef,
  isValidElement,
  useCallback,
} from 'react';
import { array, func, node, object } from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { merge, zipObject } from 'lodash';

import { useAuth } from 'app/context';
import { log } from 'common/utils';

/**
 * Helper function to loop thru children
 * and apply a callback to valid elements
 * @param {collection} children - child elements to loop thru
 * @param {function}
 */
const renderChildren = (children, update) =>
  Children.map(children, (Child) => {
    // if an element, update
    return isValidElement(Child) ? update(Child) : Child;
  });

const Form = forwardRef(
  (
    {
      defaultValues = {},
      isSubmitting,
      onFail,
      onPass,
      validation = {},
      watch: watchFields = [],
      children,
    },
    ref,
  ) => {
    // console.log('<Form>', { defaultValues, validation, watchFields });
    const { update: updateAuth } = useAuth();

    // yup schema
    const schema = yup.object().shape(validation);

    // useForm
    const {
      formState: { errors },
      getValues,
      handleSubmit,
      register,
      watch,
      control,
    } = useForm({
      defaultValues,
      resolver: yupResolver(schema),
    });

    // watch
    const watchValues = watch(watchFields);

    // callback to update a form element with react-hook-form props
    const updateFormElement = useCallback(
      (El) => {
        const {
          name,
          watch: watchCallback, // remove from props
          inputProps, // remove from props
          error, // remove from props
          ...elProps
        } = El.props;

        // console.log({ name, watchCallback, elProps });

        // if watch callback does not return truthy, do not render
        if (watchCallback) {
          const watchers = zipObject(watchFields, watchValues); // creates object

          // if callback returns falsey, do not render the element
          if (!watchCallback(watchers)) {
            return null;
          }
        }

        // update children recursively
        const children = renderChildren(elProps.children, updateFormElement);

        // build form props using `name` (required to register with react-hook-form)
        const formProps = name
          ? {
              name,
              control, // for use when we cannot apply ref
              inputProps: merge(
                register(name), // register with react-hook-form
                inputProps, // merge with inputProps
              ),
              disabled: elProps.disabled || isSubmitting,
              error: errors?.[name]?.message || error, // add error message

              // to update auth cookie
              onFocus: (...args) => {
                updateAuth();
                if (typeof elProps.onFocus === 'function') {
                  elProps.onFocus(args);
                }
              },
              onBlur: (...args) => {
                updateAuth();
                if (typeof elProps.onBlur === 'function') {
                  elProps.onBlur(args);
                }
              },
            }
          : {};

        const props = {
          key: El.key, // passthru prop
          ref: El.ref, // passthru prop
          ...elProps, // initial el props
          ...formProps,
          children, // child, please
        };
        // console.log(name, { formProps, props });

        // using createElement to let us remove the `watch` prop (instead of cloneElement)
        return createElement(El.type, props);
      },
      [
        watchFields,
        watchValues,
        register,
        control,
        errors,
        isSubmitting,
        updateAuth,
      ],
    );

    return (
      <form
        onSubmit={handleSubmit(
          (data) => {
            log('!Form.onPass', {
              level: 'warn',
              api: false, // don't log form data to our logs, for security
              ga: false, // don't log form data to ga, for security
              data, // data is for console only
            });
            onPass(data);
          },
          (errors) => {
            const error = Object.entries(errors).reduce(
              (obj, [key, { message, type }]) => ({
                ...obj,
                // don't log data, for security
                [key]: { message, type },
              }),
              {},
            );

            log('!Form.onFail', {
              // data, don't log data, for security
              error: JSON.stringify(error),
              type: 'form submission',
            });

            if (typeof onFail === 'function') {
              onFail(errors, { data: getValues() });
            }
          },
        )}
        ref={ref}
      >
        {renderChildren(children, updateFormElement)}
      </form>
    );
  },
);

Form.propTypes = {
  children: node.isRequired,
  defaultValues: object,
  onFail: func,
  onPass: func.isRequired,
  validation: object,
  watch: array,
};

export default Form;
