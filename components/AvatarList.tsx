import Img from "next/image";

type Props = {
  authors: {
    slug: string | null;
    name?: string | undefined;
    avatar?: string | null | undefined;
  }[];
};

const AvatarList = ({ authors }: Props) => {
  return (
    <ul className="flex -space-x-4">
      {authors.map((author) =>
        author.avatar ? (
          <li key={author.slug}>
            <Img
              className="w-12 h-12 rounded-full ring-2 ring-white"
              alt={`Avatar for ${author.name}`}
              src={`/images/authors/${author.slug}/${author.avatar}`}
              width={96}
              height={96}
            />
          </li>
        ) : null
      )}
    </ul>
  );
};

export default AvatarList;
