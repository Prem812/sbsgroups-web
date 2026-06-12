"use client";

// app/employees/[slug]/page.js
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdCalendarMonth,
  MdVerified,
} from "react-icons/md";
import {
  getEmployeeBySlug,
  generateEmployeeSlug,
  employees,
  SOCIAL_PLATFORMS,
  isValidLink,
} from "@/data/employee";

export default function PublicEmployeeProfileDetail() {
  const params = useParams();

  // ── Real lookup from shared data — no duplicate mock data here ──
  const profile = getEmployeeBySlug(params.slug);

  // ── NOT FOUND state (wrong / old slug) ──
  if (!profile) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm text-center space-y-4 max-w-md">
          <p className="text-4xl">🔍</p>
          <h1 className="text-lg font-black text-slate-900">
            Employee Not Found
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            No team member exists at{" "}
            <span className="font-mono text-amber-700">
              /employees/{params.slug}
            </span>
          </p>
          <Link
            href="/employees"
            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors"
          >
            <MdArrowBack size={14} />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  // Only socials with a real URL (phone & email are shown separately below,
  // so the strip here shows the remaining platforms)
  const availableSocials = SOCIAL_PLATFORMS.filter(
    ({ key }) =>
      key !== "phone" && key !== "email" && isValidLink(profile[key])
  );

  // Display-friendly contact values (strip tel: / mailto: prefixes)
  const phoneDisplay = profile.phone?.replace(/^tel:/, "") || "";
  const emailDisplay = profile.email?.replace(/^mailto:/, "") || "";

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-12 font-sans text-slate-800 antialiased">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* BACK LINK */}
        <Link
          href="/employees"
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors"
        >
          <MdArrowBack size={14} />
          Back to Team Directory
        </Link>

        {/* CORE DETAILS CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">

          {/* IDENTITY HEADER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left border-b border-slate-100 pb-6">

            {/* Real avatar image with gradient frame */}
            <div
              className={`shrink-0 w-28 h-28 rounded-3xl bg-gradient-to-br ${profile.bgGradient} p-1 shadow-md`}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover object-top rounded-[1.25rem] bg-slate-100"
              />
            </div>

            <div className="space-y-1.5 w-full">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <MdVerified size={14} className="text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {profile.id}
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                {profile.role} —{" "}
                <span className="text-blue-900 font-black">{profile.tag}</span>
              </p>

              {/* Route param badge (routing proof) */}
              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md block w-max mx-auto sm:mx-0">
                  🛰️ /employees/{params.slug}
                </span>
              </div>
            </div>
          </div>

          {/* SHORT DESCRIPTION (card description from directory) */}
          {profile.description && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Profile Summary
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {profile.description}
              </p>
            </div>
          )}

          {/* BIOGRAPHY */}
          {profile.biography && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Operational Scope Biography
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/70 p-4 rounded-xl border">
                {profile.biography}
              </p>
            </div>
          )}

          {/* CONTACT INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

            {/* Direct contact */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <span className="text-[9px] font-black uppercase text-slate-400">
                Direct Contact
              </span>
              {isValidLink(profile.phone) && (
                <a
                  href={profile.phone}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 hover:text-blue-900 transition-colors"
                >
                  <MdPhone size={14} className="text-slate-400 shrink-0" />
                  {phoneDisplay}
                </a>
              )}
              {isValidLink(profile.email) && (
                <a
                  href={profile.email}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900 hover:underline truncate"
                >
                  <MdEmail size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{emailDisplay}</span>
                </a>
              )}
            </div>

            {/* Station / joining */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <span className="text-[9px] font-black uppercase text-slate-400">
                Station &amp; Tenure
              </span>
              {profile.officeLocation && (
                <p className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <MdLocationOn size={14} className="text-slate-400 shrink-0" />
                  {profile.officeLocation}
                </p>
              )}
              {profile.joiningDate && (
                <p className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <MdCalendarMonth size={14} className="text-slate-400 shrink-0" />
                  Joined {profile.joiningDate}
                </p>
              )}
            </div>
          </div>

          {/* SOCIAL LINKS STRIP — looped, only valid links */}
          {availableSocials.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-[9px] font-black uppercase text-slate-400 block">
                Connect Online
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {availableSocials.map(({ key, label, Icon }) => (
                  <a
                    key={key}
                    href={profile[key]}
                    title={label}
                    aria-label={`${profile.name} — ${label}`}
                    target={
                      profile[key].startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      profile[key].startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 shadow-sm"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MORE TEAM MEMBERS */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            More From The Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {employees
              .filter((other) => other.id !== profile.id)
              .slice(0, 4)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/employees/${generateEmployeeSlug(other.name, other.role)}`}
                  className="bg-white border border-slate-200 rounded-2xl p-3.5 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200 space-y-0.5 shadow-sm"
                >
                  <p className="text-xs font-black text-slate-900 truncate">
                    {other.name}
                  </p>
                  <p className="text-[9px] font-extrabold text-blue-900 uppercase tracking-wider truncate">
                    {other.role}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}