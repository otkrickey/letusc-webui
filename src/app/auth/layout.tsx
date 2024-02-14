const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-8">
            {children}
        </div>
    );
};

export default AuthLayout;