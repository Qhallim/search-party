function ItemCard({ item }) {
    return (
        <div className="card mb-3 shadow-sm mx-auto" style={{
            maxWidth: "420px",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
        }}>

            <div className="ratio ratio-1x1" style={{ maxHeight: "900px" }}>
                <img
                    src={item.imageUrl}
                    className="w-100 h-100"
                    style={{
                        objectFit: "cover",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px"


                    }}
                    alt={item.name}
                />
            </div>

            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>

                <span className={`badge ${item.status === "Lost" ? "bg-danger" : "bg-success"}`}>
                    {item.status}
                </span>

                <p className="text-muted mt-2">
                    Posted by: {"@" + item.username}
                </p>
            </div>
        </div>
    );
}

export default ItemCard;