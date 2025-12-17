import GivingMethod from "./GivingMethod";

const OtherGivingMethod = () => {
  return (
    <div>
      {/* Other Ways to Give */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 text-center mt-10">
          Other Ways to Give
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GivingMethod title="E-Transfer">
            Donate through your bank’s Interac e-Transfer (no password needed).
            <p>
              <strong>OFFERING: cecalgarychurch@hotmail.com</strong>
            </p>{" "}
            <p>
              <strong>PARTNERSHIP: cegrouppartnership@gmail.com</strong>
            </p>
            <br />
            Kindly include your name, address, phone, amount, and fund(s).
          </GivingMethod>

          <GivingMethod title="Text to Give">
            Text <strong>“CECGive”</strong> to <strong>12345</strong>. You will
            receive a response guiding you to complete your gift using a credit
            card.
          </GivingMethod>

          <GivingMethod title="Automatic Bank Withdrawal">
            To have funds withdrawn directly from your bank account, kindly
            visit the Information Desk or email the church office for
            assistance.
          </GivingMethod>

          <GivingMethod title="Giving Stations">
            Debit and credit machines are available at the church office at FAC
            Deerfoot during office hours.
          </GivingMethod>

          <GivingMethod title="Cash & Cheques">
            Please make cheques payable to{" "}
            <strong>Christ Embassy Calgary Church</strong>. Gifts can be placed
            in offering baskets, dropped off, or mailed to the church office at
            <b> 2925 10 Ave NE, Calgary, AB T2A 5L4.</b>
          </GivingMethod>

          {/* <GivingMethod title="Planned Giving">
            To donate publicly listed securities (shares), please contact
            <strong> Rob Neumann, Financial Controller</strong> at
            <strong> 403-212-8850</strong>.
          </GivingMethod> */}
        </div>
      </div>
    </div>
  );
};

export default OtherGivingMethod;
