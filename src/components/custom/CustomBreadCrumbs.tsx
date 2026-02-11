import { Link } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { SlashIcon } from "lucide-react";
// import React from "react";

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string,
    breadcrumbs?: Breadcrumb[]
}


export const CustomBreadCrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {
    // const { pathname } = useLocation();
    // const separatePath = pathname.split("/").filter(Boolean);

    return (
        <>
            <Breadcrumb className="my-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {
                        breadcrumbs.map((crumb) => (
                            <div className="flex items-center">

                                <BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <SlashIcon />
                                    </BreadcrumbSeparator>
                                    <BreadcrumbLink asChild>
                                        <Link to={crumb.to}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </div>
                        ))
                    }
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            {/* OTRA FORMAAAAAAAAAAAAAAAA CON EL PATH */}

            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {separatePath.map((miga, index) => (
                        <React.Fragment key={index}>

                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>

                            {index === separatePath.length - 1 ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{miga}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link to={`/${miga}`}>{miga}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb> */}


        </>

    )
}