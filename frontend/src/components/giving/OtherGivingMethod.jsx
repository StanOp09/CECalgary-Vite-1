// OtherGivingMethod.jsx
import { MapPin } from "lucide-react";

const allMethods = [
  {
    title: "E-Transfer",
    body: (
      <>
        <p>Give through your bank's Interac e-Transfer (no password needed).</p>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-4 py-3">
            <div className="text-xs font-semibold text-gray-500">
              TITHE & OFFERING
            </div>
            <div className="font-semibold text-gray-900 break-all">
              christembassycalgary@hotmail.com
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-4 py-3">
            <div className="text-xs font-semibold text-gray-500">PARTNERSHIP</div>
            <div className="font-semibold text-gray-900 break-all">
              calgarygrouppartnership@gmail.com
            </div>
          </div>
        </div>

        <p className="mt-4">Kindly include a message for your giving.</p>
      </>
    ),
  },
  {
    title: "Text to Give",
    body: (
      <p>
        Text <span className="font-semibold">"Give"</span> to{" "}
        <a
          href="sms:+18339290579"
          className="font-semibold text-indigo-600 hover:underline"
        >
          (833) 929-0579
        </a>
        . You will receive a response guiding you to complete your giving using
        your card.
      </p>
    ),
  },
  {
    title: "Automatic Bank Withdrawal",
    body: (
      <p>
        To have funds withdrawn directly from your bank account, visit the
        Information Desk or email Church at <b>cecalgarychurch@gmail.com</b>{" "}
        office for assistance.
      </p>
    ),
  },
  {
    title: "Giving Stations",
    body: (
      <p>
        <b>Debit and Credit machines</b> are available during office & service
        hours at the Church premises, 2925 10 Ave NE, Calgary, AB T2A 5L4.
      </p>
    ),
  },
  {
    title: "Cash & Cheques",
    body: (
      <>
        <p>
          Please make cheques payable to <b>Christ Embassy Calgary Church</b>.
        </p>
        <p className="mt-2 flex items-start gap-2 text-gray-700">
          <MapPin className="h-4 w-4 mt-0.5 text-gray-500 shrink-0" />
          <span>
            2925 10 Ave NE, Calgary, AB T2A 5L4. Givings can be placed in
            offering baskets, dropped off, or mailed to the Church office.
          </span>
        </p>
      </>
    ),
  },
];

export default function OtherGivingMethod() {
  return (
    <section className="py-20 px-4 bg-[#F6F4E8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-600 mb-2">
            More Options
          </p>
          <h2 className="font-raleway text-3xl sm:text-4xl font-bold text-gray-900">
            Other Ways to Give
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {allMethods.map(({ title, body }) => (
            <div key={title}>
              <h3 className="font-raleway text-lg font-bold text-gray-900 mb-2">
                {title}
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
