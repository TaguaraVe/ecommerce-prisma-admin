import prismadb from '@/lib/prismadb';

interface DasbordPageProps {
  params: { storeId: string };
}
const DasbordPage: React.FC<DasbordPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <section>
      <h1>Dashboard Page</h1>
      <h2>Active Store = {store?.name}</h2>
    </section>
  );
};

export default DasbordPage;
