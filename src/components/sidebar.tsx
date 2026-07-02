import { profile, sections } from "@/data/profile";

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col justify-between py-10 lg:sticky lg:top-0 lg:h-screen lg:py-24">
      <div>
        <a className="inline-flex text-4xl font-semibold tracking-normal text-slate-100 sm:text-5xl" href="#">
          {profile.name}
        </a>
        <p className="mt-3 text-lg font-medium text-slate-200">{profile.role}</p>
        <p className="mt-5 max-w-sm text-base leading-7 text-slate-400">{profile.summary}</p>

        <nav className="mt-12 hidden lg:block" aria-label="Section navigation">
          <ol className="space-y-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a className="group flex items-center gap-4 transition-colors hover:text-slate-200" href={`#${section.id}`}>
                  <span className="h-px w-8 bg-slate-600 transition-all group-hover:w-14 group-hover:bg-teal-300" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{section.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mt-10 flex flex-wrap gap-4 text-sm font-medium text-slate-400">
        {profile.links.map((link) => (
          <a
            className="rounded-sm border border-slate-700/70 px-3 py-2 transition-colors hover:border-teal-300/70 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300/70"
            href={link.href}
            key={link.label}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            target={link.href.startsWith("http") ? "_blank" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
