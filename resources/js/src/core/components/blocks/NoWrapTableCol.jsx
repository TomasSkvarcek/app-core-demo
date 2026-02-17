function NoWrapTableCol({ children, th = false }) {
    if (th) {
        return (
            <th className="nowrap-table-col">
                { children }
            </th>
        )
    } else {
        return (
            <td className="nowrap-table-col">
                { children }
            </td>
        )
    }

}

export default NoWrapTableCol
