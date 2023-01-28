import usePartnerUtm from '../usePartnerUtm';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
    };
  },
}));

describe('usePartenerUtm', () => {
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
