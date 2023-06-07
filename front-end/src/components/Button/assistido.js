
function Assistido(props) {
    return (
        <button className="move" onClick={() => props.onClick(props.id)}>
            {props.assistido ? "Assistir Novamente" : "Assistir"}
        </button>
    );
}

export default Assistido;