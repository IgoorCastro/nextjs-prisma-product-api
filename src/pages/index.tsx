// Front não desenvolvido. Projeto feito apenas para estudo do Prisma + Clean Arch com Zod nas validações.

import { UpdateProductDto } from "@/modules/product/dto/updateProduct.dto";
import Image from "next/image";
import { useEffect } from "react";

const createProductTest = async () => {
  const testCreateFetch = await fetch('/api/productController?id=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "Produto de teste",
      price: 125.59,
      description: "Somente um teste"
    })
  });
  const res = await testCreateFetch.json();
  console.log(res);
};

const deleteProductTest = async (id: number) => {
  const testDeleteFetch = await fetch(`/api/productController?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const res = await testDeleteFetch.json();
  console.log(res);
}

const getAllProductsTest = async () => {
  const testFindAllFetch = await fetch('/api/productController', {
    method: 'GET',
  });
  const res = await testFindAllFetch.json();
  console.log(res); 
}

const getProductById = async (id: number) => {
  const testFindUnique = await fetch(`/api/productController?id=${id}`, {
    method: 'GET',
  });
  const res = await testFindUnique.json();
  console.log(res);
}

const updateProduct = async (id: number, data: UpdateProductDto) => {
  const testUpdateFetch = await fetch(`/api/productController?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const res = await testUpdateFetch.json();
  console.log(res);
}

export default function Home() {
  useEffect(() => {
    const testApi = async () => {
      // createProductTest();
      // deleteProductTest();
      // getAllProductsTest();
      // getProductById(3);
      // updateProduct(3, {
      //   name: 'Produto atualizado',
      //   price: 99.99,
      //   description: 'Descrição atualizada'
      // });
    };

    testApi();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert-25"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
