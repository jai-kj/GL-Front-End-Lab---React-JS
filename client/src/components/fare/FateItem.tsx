import {IfareProps} from './../../model/Ifare'

const FateItem = ({fare}: IfareProps) => {
    return (
        <tr>
            <td className="p-4">{fare?.title}</td>
            <td className="text-right p-4">{fare?.date}</td>
            <td className="text-right p-4">
                <i className="fa-solid fa-pen-to-square cursor-pointer transition duration-75 hover:scale-125 hover:text-blue-400" />
            </td>
        </tr>
    )
}

export default FateItem