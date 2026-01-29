export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h2>This is Contact Us Layout</h2>
            {children}
        </div>
    );
}