// import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
// import { cn } from "@/lib/utils";

export const CustomMenu = () => {

    const { pathname } = useLocation();


    const isActive = (path: string) => {
        return pathname === path;
    }

    return (

        <NavigationMenu className="py-5">
            <NavigationMenuList>

                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        // className={cn(isActive('/') && 'bg-slate-200', 'p-2 rounded-md')}

                        //! otra forma de hacerlo... revisar index.css ya que ahi esta la otra parte de la solución, solución de otro estudiante
                        active={isActive("/")}
                        className="navigation-menu-link rounded-md p-2"

                    >
                        <Link to="/">Inicio</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        // className={cn(isActive('/search') && 'bg-slate-200', 'p-2 rounded-md')}
                        active={isActive("/search")}
                        className="navigation-menu-link rounded-md p-2"

                    >
                        <Link to="/search">Buscar Superhéroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu >
    )
}