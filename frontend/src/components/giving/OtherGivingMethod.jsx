// OtherGivingMethod.jsx
import {
  Mail,
  MessageSquareText,
  Building2,
  CreditCard,
  Banknote,
  MapPin,
} from "lucide-react";

import GivingMethod from "./GivingMethod";

const eTransfer = {
  title: "E-Transfer",
  icon: Mail,
  body: (
    <>
      <p>Give through your bank’s Interac e-Transfer (no password needed).</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <p className="mt-4 text-sm text-gray-600">
        Kindly include a message for your giving.
      </p>
    </>
  ),
};

const otherMethods = [
  {
    title: "Text to Give",
    icon: MessageSquareText,
    body: (
      <p>
        Text <span className="font-semibold">“Give”</span> to{" "}
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
    icon: Building2,
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
    icon: CreditCard,
    body: (
      <p>
        <b>Debit and Credit machines</b> are available during office & service
        hours at the Church premises, 2925 10 Ave NE, Calgary, AB T2A 5L4.
      </p>
    ),
  },
  {
    title: "Cash & Cheques",
    icon: Banknote,
    body: (
      <>
        <p>
          Please make cheques payable to <b>Christ Embassy Calgary Church</b>.
        </p>
        <p className="mt-2 flex items-start gap-2 text-gray-700">
          <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
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
    <section className="bg-white/60 border-t border-gray-200 p-6 mb-16">
      {/* E-Transfer (full width) */}
      <div className="mb-8">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 sm:p-8 hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 ring-1 ring-indigo-100 flex items-center justify-center">
              <eTransfer.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900">
                {eTransfer.title}
              </h4>
              <div className="mt-3 text-gray-700 leading-relaxed">
                {eTransfer.body}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other methods (2-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {otherMethods.map(({ title, icon: Icon, body }) => (
          <div
            key={title}
            className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 sm:p-7 hover:shadow-md transition"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 ring-1 ring-indigo-100 flex items-center justify-center">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{title}</h4>
                <div className="mt-2 text-gray-700 leading-relaxed">{body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
