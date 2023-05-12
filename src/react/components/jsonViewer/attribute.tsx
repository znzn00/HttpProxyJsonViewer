import classNames from "classnames";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import Swal from "sweetalert2";

const defaultClass = "m-0 row border rounded";

function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    Swal.fire({
        toast: true,
        title: 'Copy to clipboard:',
        html: value,
        showConfirmButton: false,
        timer: 1500
    })
}

export function JsonAttribute(props: {
    name: string;
    value: any;
} & any) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const name = props.name;
    const value = props.value;
    if (typeof value == 'object')
        return (
            <>
                <div className={defaultClass}>
                    <div role="button" className="col" onContextMenu={() => copyToClipboard(name)} onClick={() => setOpen(!isOpen)}>{name}</div>
                    <div role="button"
                        className="col-auto"
                        onContextMenu={() => copyToClipboard(name)}
                        onClick={() => setOpen(!isOpen)}
                    >
                    </div>
                </div>
                <div className={"m-0 row ms-4"}>
                    <Collapse className="p-0" in={isOpen}>
                        <div>
                            {
                                Object.keys(value).sort((k1, k2) => k1.localeCompare(k2)).map(
                                    (k) => (<JsonAttribute key={name + "/" + k} name={k} value={value[k]}></JsonAttribute>)
                                )
                            }
                        </div>
                    </Collapse>
                </div>
            </>
        )

    return (
        <div className={defaultClass}>
            <div className="col-auto" onContextMenu={() => copyToClipboard(name)}>{name}:</div><div onContextMenu={() => copyToClipboard(value + "")} className="col border-start">{value + ""}</div>
        </div>

    )
}