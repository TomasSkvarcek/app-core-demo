import ContentLoader from "@/src/core/components/core/ContentLoader";

function ActionItemList({
    items = [],
    selectRoleHandler,
    selectedRoleID,
    loading,
    overflowHeight = '70vh'
}) {
    return (
        <div className="list-group overflow-auto" style={{height: overflowHeight}}>
            <ContentLoader loading={loading} />
            {items.map(item => {
                    return (
                        <button key={item.id} type="button" onClick={() => selectRoleHandler(item.id)}
                                className={(selectedRoleID === item.id) ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                            { item.name }
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ActionItemList
