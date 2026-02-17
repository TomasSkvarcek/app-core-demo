function ContainerMiddle({ children }) {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-7">
                { children }
            </div>
        </div>
    )
}

export default ContainerMiddle
