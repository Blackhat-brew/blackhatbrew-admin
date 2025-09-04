const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      href={href}
      className="bg-gray-light mb-3 mr-3 inline-flex items-center justify-center rounded-lg  px-4 py-2 text-sm text-primary duration-300    dark:bg-[#2C303B] dark:text-white  "
    >
      {text}
    </a>
  );
};

export default TagButton;
