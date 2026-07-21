import type {AppPage} from "../types.ts";
import type {ReactNode} from "react";

type AppLayoutProps = {
    activePage: AppPage;
    onPageChange: (page: AppPage) => void;
    children: ReactNode;
}

const navItems:Array<{page: AppPage, label: string}> = [
    {page: 'home', label: 'Home'},
    {page: 'class', label: 'Class'},
    {page: 'function', label: 'Function'},
]

function AppLayout({activePage,children,onPageChange}: AppLayoutProps) {
    return (
        <div className="layout">
            <header className="header">
                <div className="header__logo">
                    <h1>Currency rate</h1>
                </div>
                <nav className="nav">
                    {navItems.map((item) => (
                        <button
                            className={`nav__btn${activePage === item.page ? ' nav__btn--active' : ''}`}
                            key={item.page}
                            onClick={()=>onPageChange(item.page)}
                            type="button"
                            >
                            {item.page}
                        </button>
                    ) )}
                </nav>
            </header>
            <main className="main">{children}</main>
        </div>
    )
}
export default AppLayout;