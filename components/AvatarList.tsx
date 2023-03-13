import Img from "next/image";

type Props = {
  authors: {
    slug: string | null;
    name?: string | undefined;
    avatar?: string | null | undefined;
    role?: string | null | undefined;
  }[];
};

const AvatarList = ({ authors }: Props) => {
  return (
    <ul className="flex -space-x-2 shrink-0">
      {authors.map((author) =>
        author.avatar ? (
          <li key={author.slug}>
            <Img
              className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
              alt={`Avatar for ${author.name}`}
              src={`/images/authors/${author.slug}/${author.avatar}`}
              width={80}
              height={80}
            />
          </li>
        ) : null
      )}
    </ul>
  );
};

export default AvatarList;
