import Button from "./Button";

type InlineCTAProps = {
  title: string;
  summary: string;
  linkButton: { href: string; label: string; externalLink: boolean };
};

const InlineCTA = (props: InlineCTAProps) => {
  return (
    <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-3 max-w-3xl mx-auto rounded-xl border-slate-300 border-2 external-link">
      <section className="p-8 row-span row-span-1 md:col-span-2 border-b-2 md:border-b-0 md:border-r-2 border-slate-300">
        <p className="text-xl mb-2">{props.title}</p>
        <p className="mb-8">{props.summary}</p>
        {props.linkButton.href && (
          <Button
            externalLink={props.linkButton.externalLink}
            href={props.linkButton.href}
            label={props.linkButton.label}
          />
        )}
      </section>
      <div className='row-span-1 md:col-span-1 not-prose self-center bg-[url("/thinkmill-cover.png")] w-full h-full bg-cover bg-center rounded-b-xl md:rounded-bl-none md:rounded-r-xl' />
    </div>
  );
};

export default InlineCTA;
