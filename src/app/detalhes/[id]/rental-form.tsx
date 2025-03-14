"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Loader2, ShoppingCart} from "lucide-react";
import {currencyFormat} from "@/lib/utils";
import Form from "next/form";
import {useActionState, useEffect, useState} from "react";
import {addToCart} from "@/app/actions/add-to-cart";
import ErrorMessage from "@/components/ui/error-message";
import SuccessMessage from "@/components/ui/success-message";

interface Props {
  productId: string;
  userEmail: string;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number
}

export default function RentalForm(props: Props) {

  const [rental, setRental] = useState('DAILY');
  const [state, formAction, isPending] = useActionState(addToCart, null);

  useEffect(() => {
    if (state) {
      setRental('DAILY');
    }
  }, [state]);

  return (
    <Form action={formAction}>
      <input type="hidden" value={props.productId} name="productId" />
      <input type="hidden" value={props.userEmail} name="userEmail" />
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Selecionar Modalidade de Locação:</h3>

        <Select name="rental" onValueChange={(value) => setRental(value)} value={rental} >
          <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white">
            <SelectValue placeholder="Selecione uma modalidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAILY">Diário - {currencyFormat(props.daily)}</SelectItem>
            <SelectItem value="WEEKLY">Semanal - {currencyFormat(props.weekly)}</SelectItem>
            <SelectItem value="BIWEEKLY">Quinzenal - {currencyFormat(props.biweekly)}</SelectItem>
            <SelectItem value="MONTHLY">Mensal - {currencyFormat(props.monthly)}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full flex items-center justify-center dark:bg-gray-700 dark:text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        { isPending ? (<Loader2 className="animate-spin" />) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Adicionar ao Carrinho
          </>
        )}
      </Button>
      { state?.success === false && (!isPending) && (
        <div className="mt-4">
          <ErrorMessage message={"Erro ao adicionar ao carrinho"} />
        </div>
      )}
      { (state?.success === true) && (!isPending) && (
        <div className="mt-4">
          <SuccessMessage message={"Produto adicionado com sucesso"} />
        </div>
      )}
    </Form>
  );
}