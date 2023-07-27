import getBillboard from "@/actions/get-billboards";
import getproducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getproducts({ isFeatured: true})
    const billboard = await getBillboard("39dbda96-112b-4946-ae4e-23bdf1447ae8")
    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
            </div>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="Featured Products" items={products} />
            </div>
        </Container>
    );
}
 
export default HomePage;