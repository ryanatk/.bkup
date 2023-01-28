import usePartnerUtm from '../usePartnerUtm';

const mockRouter = (query) =>
  jest.mock('next/router', () => ({
    useRouter() {
      return {
        query,
      };
    },
  }));

// const useRouter = jest.spyOn(require('next/router'), 'useRouter');

// export function mockUseRouter(props: {
//   route: string;
//   pathname: string;
//   query: string;
//   asPath: string;
// }) {
//   useRouter.mockImplementationOnce(() => ({
//     route: props.route,
//     pathname: props.pathname,
//     query: props.query,
//     asPath: props.asPath,
//   }));
// }

describe('usePartenerUtm', () => {
  mockRouter({});

  it('should always return the full shape', () => {
    const partner = usePartnerUtm();
    console.log(partner);
    expect(partner.router).toBe(null);
  });

  describe('with a utm in the url', () => {
    it('should write to storage', () => {});
  });

  describe('with no partner utm in storage & no utm in the url', () => {
    it('should return undefined', () => {});

    it('should not match', () => {});
  });

  describe('with no partner utm in storage & a utm in the url', () => {
    it('', () => {});
  });

  describe('with a partner utm in storage & no utm in the url', () => {
    it("should return what's in storage", () => {});
    it('', () => {});
  });

  describe('with a partner utm in storage & a utm in the url', () => {
    it('should write to storage', () => {});

    it('', () => {});
  });
});
