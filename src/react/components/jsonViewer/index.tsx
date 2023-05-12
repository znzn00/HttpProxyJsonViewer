import { JsonAttribute } from "./attribute"

export function JsonViewer(props: {
    json: object
} & any) {
    const json = props.json;
    return (
        <>
                {
                    Object.keys(json).sort((k1, k2) => k1.localeCompare(k2)).map(
                        (k) => (<JsonAttribute key={k} name={k} value={json[k]}></JsonAttribute>)
                    )
                }
        </>
    )
}