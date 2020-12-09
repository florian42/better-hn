import React from "react";
import { Link } from "react-router-dom";

const Title: React.FC<{
  url: string;
  title: string;
  id: number;
}> = ({ url, title, id }) => {
  return url ? (
    <a className="link" href={url}>
      {title}
    </a>
  ) : (
    <Link className="link" to={`/post?id=${id}`}>
      {title}
    </Link>
  );
};

export default Title;
