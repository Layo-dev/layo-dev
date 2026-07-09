import reactLogo from '@/assets/react.svg';
import typescriptLogo from '@/assets/typescript.svg';
import tailwindLogo from '@/assets/tailwindcss.svg';
import nodejsLogo from '@/assets/nodejs.svg';
import supabaseLogo from '@/assets/supabase.svg';
import postgresqlLogo from '@/assets/postgresql.svg';
import githubLogo from '@/assets/github.svg';

type Tech = { name: string; logo?: string };
type Category = { title: string; items: Tech[] };

const categories: Category[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'React', logo: reactLogo },
      { name: 'TypeScript', logo: typescriptLogo },
      { name: 'Tailwind', logo: tailwindLogo },
      { name: 'Vite' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', logo: nodejsLogo },
      { name: 'Supabase', logo: supabaseLogo },
      { name: 'PostgreSQL', logo: postgresqlLogo },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'AI & Dev',
    items: [
      { name: 'Lovable' },
      { name: 'Cursor' },
      { name: 'OpenAI' },
      { name: 'GitHub', logo: githubLogo },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 xs:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 xs:mb-16 animate-fade-in">
          <h2 className="font-poppins text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2 xs:px-0">
            Tech Stack
          </h2>
          <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
            Technologies I use to build modern digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              className="rounded-2xl bg-surface-dark text-surface-light p-6 sm:p-8 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="font-poppins text-xl xs:text-2xl font-semibold mb-5 xs:mb-6">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2 xs:gap-3">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 xs:px-4 xs:py-2 text-xs xs:text-sm font-inter font-medium"
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        loading="lazy"
                        className="h-4 w-4 xs:h-[18px] xs:w-[18px]"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-white/60"
                      />
                    )}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
