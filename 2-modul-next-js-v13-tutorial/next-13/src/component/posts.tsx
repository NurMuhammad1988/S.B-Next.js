import { PostType } from "@/interface"
import Link from "next/link"
import { FC } from "react"

const Posts: FC<{data: PostType[]}> = ({data}) => {
    // post papkani ichidagi page.tsxda serverdan chaqirilgan datalarni bu Posts sahifasiga chaqirib olindi va typeham berib qo'yildi va propsdan data chaqirib olindi chunki data posts papkani ichidagi page.tsxdaham props bilan distruptatsa qilib jo'natilgan
  return (
    <table border={1}>
    <thead>
        <th>id</th>
        <th>title</th>
    </thead>
    <tbody>
        {data.map((c) => (
            <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                    <Link href={`/posts${c.id}`}>{c.title}</Link>
                    {/* id bor lekin title yo'q   */}
                </td>
            </tr>
        ))}
    </tbody>
</table>
  )
}

export default Posts