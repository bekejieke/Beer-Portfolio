import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { experience } from "@/data/experience";
import { otherProjects, featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <div className="portfolio-shell mx-auto min-h-screen w-full max-w-6xl gap-8 px-6 sm:px-10 lg:px-12">
        <Sidebar />

        <div className="min-w-0 pb-20 pt-4 lg:py-24">
          <Section id="about" title="About">
            <p className="max-w-2xl text-base leading-8 text-slate-400">
              Beer Portfolio is a focused personal developer site for showing product thinking,
              implementation process, project evidence, and practical front-end work. This shell keeps
              the structure intentionally simple so future tasks can add verified content slice by slice.
            </p>
          </Section>

          <Section id="experience" title="Experience">
            <div className="space-y-8">
              {experience.map((item) => (
                <article className="grid gap-2 border-t border-slate-700/60 pt-6 sm:grid-cols-[0.28fr_0.72fr]" key={item.role}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.period}</p>
                  <div>
                    <h3 className="font-semibold text-slate-100">{item.role}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li className="text-xs text-teal-200" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="featured-projects" title="Featured Projects">
            <div>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </Section>

          <Section id="other-projects" title="Other Projects">
            <ul className="grid gap-3 sm:grid-cols-2">
              {otherProjects.map((project) => (
                <li className="rounded-md border border-slate-700/60 p-4 text-sm text-slate-400" key={project}>
                  {project}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="notes" title="Notes">
            <div className="space-y-4 border-t border-slate-700/60 pt-6 text-sm leading-6 text-slate-400">
              <p>Notes will collect product reviews, implementation logs, and testing reflections.</p>
              <p>The first MVP keeps MDX content directories ready while deferring rendering logic.</p>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="border-t border-slate-700/60 pt-6">
              <p className="max-w-xl text-base leading-8 text-slate-400">
                Open to internship conversations, project feedback, and collaboration around practical AI
                product workflows.
              </p>
              <a
                className="mt-6 inline-flex rounded-sm bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-slate-950"
                href="mailto:hello@example.com"
              >
                Say hello
              </a>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
