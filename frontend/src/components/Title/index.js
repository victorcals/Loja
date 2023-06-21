export default function Title({ title, text }) {
    return (
        <div className="container">
            <div className="pricing-header text-center">
                <h1 className="display-4">{title}</h1>
                <p className="lead">{text}</p>
            </div>
        </div>
    )
}