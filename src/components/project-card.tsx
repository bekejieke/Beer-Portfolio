type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
};

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <article className="group grid min-w-0 gap-4 border-t border-slate-700/60 py-7 transition-colors hover:border-slate-500/70 sm:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
      <div className="aspect-[16/10] rounded-md border border-slate-700/60 bg-slate-800/40 transition-colors group-hover:border-teal-300/40" />
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-teal-200">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
          {tags.map((tag) => (
            <li className="rounded-sm bg-teal-300/10 px-2.5 py-1 text-xs font-medium text-teal-200" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
