'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-Modal';

const formSchema = z.object({
  name: z.string().min(3, 'Debe tener al menos 3 caracteres'),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  // const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/stores/${params.storeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok', response);
      }
      const dataResponse = await response.json();
      router.refresh();

      toast.success('La Rienda se actualizo.');
    } catch (error: any) {
      toast.error('!Ups.. Algo salio mal :');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (data: SettingsFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/stores/${params.storeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok', response);
      }
      await response.json();
      router.refresh();
      router.push('/');
      toast.success('La Tieda se elimino.');
    } catch (error: any) {
      toast.error('Asegurese de eliminar primero los productos y categorias');
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Preferencias de la tienda" />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            Guardar cambios
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
