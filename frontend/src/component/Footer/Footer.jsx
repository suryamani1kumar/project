
const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <div className="bg-body-secondary">
            <div className="container p-3 text-center">
               &#169; {currentYear} Dashboard. All Right Reserved

            </div>
        </div>
    )
}

export default Footer
