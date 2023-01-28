const styles = [
  /* 2-column layout wrapper */
  ` #${id} .form-columns-2 {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`,
  /* 2-column layout field */
  ` #${id} .form-columns-2 .hs-form-field {
    flex: 1 0 16rem;
  }
`,
  /* apply select's border to parent div, so we can style the arrow */
  ` #${id} .hs-fieldtype-select .input {
    display: flex;
    align-items: center;
    border: 1px solid currentColor;
  }
`,
  /* custom select arrow */
  ` #${id} .hs-fieldtype-select .input:not(.select--multiple)::after {
    content: "";
    display: inline-block;
    margin: 0 0.5rem;
    width: 0.8rem;
    height: 0.5rem;
    background-color: currentColor;
    clip-path: polygon(100% 0%,0 0%,50% 100%);
  }
`,
  /* error message above "submit" button */
  ` #${id} .hs_error_rollup {
    color: rgba(220, 38, 38);
  }
`,
].join('');

export default styles;
