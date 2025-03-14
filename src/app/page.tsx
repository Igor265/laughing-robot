import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {Info} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getProducts, getTotalProducts} from "@/app/server/get-products";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {currencyFormat} from "@/lib/utils";
import SearchProductInput from "@/app/detalhes/[id]/search-product-input";
import NoProductsFound from "@/components/no-products-found";

interface HomePageProps {
  searchParams: Promise<{ page?: number, product?: string }>;
}

const ITEMS_PER_PAGE = 6;

export default async function Home({ searchParams }: HomePageProps) {

  const session = await  auth();

  if (!session) {
    return redirect("/login");
  }

  const { page = 1, product } = await searchParams;

  const totalProducts = await getTotalProducts(product);
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const products = await getProducts(page, product, totalPages, ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <SearchProductInput page={page} />
      { totalProducts === 0 ? (
        <NoProductsFound />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="shadow-md dark:bg-gray-800">
                <CardHeader>
                  <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                  <p className="mt-2 text-lg font-semibold">{currencyFormat(product.dailyRate)}</p>
                  <div className="mt-4 flex space-x-2">
                    <Button asChild variant="outline" className="w-full flex items-center justify-center dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out cursor-pointer">
                      <Link href={`/detalhes/${product.id}`}>
                        <Info className="w-5 h-5 mr-2" />
                        Detalhes
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              { page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/?page=${Number(page) - 1}&product=${product || ""}`}  />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={`/?page=${page}&product=${product || ""}`} aria-current="page">{page}</PaginationLink>
              </PaginationItem>
              {page < totalPages && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/?page=${totalPages}&product=${product || ""}`}>{totalPages}</PaginationLink>
                  </PaginationItem>
                </>
              )}
              { page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/?page=${Number(page) + 1}&product=${product || ""}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
