function HeaderTh({children, width}) {
    return (
        <th scope="col" style={{ width: width }}>
            { children }
        </th>
    )
}

export default HeaderTh
