import classNames from "classnames";
import { useEffect, useState } from "react";

export interface SidebarItem {
    title: string;
    data: any;
}

export function Sidebar(props: {
    items: SidebarItem[],
    onChange: (object: any) => void
} | any) {
    const items = props.items;
    const [selected, setSelected] = useState<SidebarItem>(items[0]);
    const onChange: (object: any) => void = props.onChange || ((e: any) => { });
    useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <ul className="nav nav-pills flex-column mb-auto">
            {items.map((item: SidebarItem) => (
                <li className="nav-item">
                    <a onClick={() => setSelected(item)} className={classNames(
                        {
                            'nav-link': true,
                            'active': item == selected
                        })
                    }>
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    )
}
