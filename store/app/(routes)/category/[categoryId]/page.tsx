import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

interface CategoryPageProps {
    params: {
        categoryId: string
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}

const CategorPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    });

    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId)

    return (
        <div className="bg-white">
            <Container>
                <Billboard 
                    data={category.billboard}
                />
            </Container>
        </div>
    );
}
 
export default CategorPage;