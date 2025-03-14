import {auth} from "@/auth";
import {notFound, redirect} from "next/navigation";
import RentalForm from "@/app/detalhes/[id]/rental-form";
import {getProductById} from "@/app/server/get-products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}


export default async function ProductDetail({ params }: ProductDetailPageProps) {

  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white p-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg shadow-md md:h-full"
          />
        </div>
        <div className="md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-m">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
          <h3 className="text-lg font-semibold mb-2">Informações Técnicas:</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{product.technicalDetails}</p>
          <RentalForm
            userEmail={session.user?.email || ""}
            productId={product.id}
            daily={product.dailyRate}
            weekly={product.weeklyRate}
            biweekly={product.biweeklyRate}
            monthly={product.monthlyRate}
          />
        </div>
      </div>
    </div>
  );
}
