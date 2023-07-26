import Link from "next/link";
import Container from "./ui/container";

const Navbar = () => {
    return (
        <div className="border-b">
            <Container>
                <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                    <p className="font-bol text-xl">Store</p>
                </Link>
            </Container>
        </div>
    );
}
 
export default Navbar;