"use client"
import { useEffect,useState } from "react"
import SectionHeaders from "../components/layout/SectionHeaders"
import MenuItems from "../components/menu/MenuItems"

export default function MenuPage(){
    const [categories,setCategories] = useState([])
    const [menuItems,setMenuItems] = useState([])
    useEffect(() => {
        fetch("/api/categories").then(res => {
            res.json().then(categories => (
                setCategories(categories)
            ))
        })
        fetch("/api/menu-items").then(res => {
            res.json().then(menuItems => setMenuItems(menuItems))
        })
    },[])
    return(
        <section className="mt-8">
            {categories?.length > 0  && categories.map(c => (
                <div>
                    <div className="text-center">
                    <SectionHeaders mainHeader={c.name} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
                    {menuItems.filter(m => m.category === c._id).map(item => (
                        <MenuItems  {...item}/>
                    ))}
                    </div>
                  
                </div>
            ))}
        </section>
    )
}
