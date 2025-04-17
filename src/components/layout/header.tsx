type HeaderProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  backgroundColor?: string;
};

const Header = ({
  icon,
  title,
  description,
  backgroundColor = '',
}: HeaderProps) => {
  return (
    <div
      className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center `}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-orange-600 ${backgroundColor}`}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h2 className="font-medium text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

export default Header;
