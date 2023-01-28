// import * as nextRouter from 'next/router';
import usePartnerUtm from '../usePartnerUtm';

// const useRouter = jest.spyOn(nextRouter, 'useRouter');

// export function mockUseRouter(props: nextRouter.NextRouter): void {
//   useRouter.mockImplementationOnce(() => ({
//     route: props.route,
//     pathname: props.pathname,
//     query: props.query,
//     asPath: props.asPath,
//   }));
// }

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {},
    };
  },
}));

describe('usePartenerUtm', () => {
  //   mockRouter({});

  it('should always return the full shape', () => {
    const partnerUtm = usePartnerUtm();
    console.log(partnerUtm);
    expect(partnerUtm).toMatchObject({
      utm: null,
      isMatch: false,
      isMatchEntry: false,
      isMatchStored: false,
    });
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
