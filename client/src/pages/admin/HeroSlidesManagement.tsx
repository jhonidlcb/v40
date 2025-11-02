
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { Plus, Edit, Trash2, MoveUp, MoveDown, Image as ImageIcon } from "lucide-react";
import type { HeroSlide } from "@shared/schema";

export default function HeroSlidesManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const { data: slides, isLoading } = useQuery<HeroSlide[]>({
    queryKey: ["/api/admin/hero-slides"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<HeroSlide>) => {
      const response = await apiRequest("POST", "/api/admin/hero-slides", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      toast({ title: "Slide creado exitosamente" });
      setIsDialogOpen(false);
      setEditingSlide(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<HeroSlide> }) => {
      const response = await apiRequest("PUT", `/api/admin/hero-slides/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      toast({ title: "Slide actualizado exitosamente" });
      setIsDialogOpen(false);
      setEditingSlide(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/hero-slides/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      toast({ title: "Slide eliminado exitosamente" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      buttonText: formData.get("buttonText") as string,
      buttonLink: formData.get("buttonLink") as string,
      displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      isActive: formData.get("isActive") === "on",
    };

    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <DashboardLayout title="Gestión de Slides Hero">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Slides del Hero Section</h2>
          <Button onClick={() => { setEditingSlide(null); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Slide
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-8">Cargando slides...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Orden</TableHead>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slides?.map((slide) => (
                    <TableRow key={slide.id}>
                      <TableCell className="font-medium">{slide.displayOrder}</TableCell>
                      <TableCell>
                        <img 
                          src={slide.imageUrl} 
                          alt={slide.title}
                          className="w-20 h-12 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/public/logo-softwarepar.png";
                          }}
                        />
                      </TableCell>
                      <TableCell>{slide.title}</TableCell>
                      <TableCell>
                        {slide.isActive ? (
                          <span className="text-green-600 font-medium">Activo</span>
                        ) : (
                          <span className="text-gray-400">Inactivo</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditingSlide(slide); setIsDialogOpen(true); }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("¿Eliminar este slide?")) {
                                deleteMutation.mutate(slide.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSlide ? "Editar Slide" : "Nuevo Slide"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título Principal *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingSlide?.title}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  defaultValue={editingSlide?.subtitle || ""}
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingSlide?.description || ""}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">URL de Imagen *</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  defaultValue={editingSlide?.imageUrl}
                  placeholder="/public/imagen.jpg o https://..."
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Sube la imagen a /client/public/ y usa /public/nombre.jpg
                </p>
              </div>

              <div>
                <Label htmlFor="buttonText">Texto del Botón</Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  defaultValue={editingSlide?.buttonText || ""}
                />
              </div>

              <div>
                <Label htmlFor="buttonLink">Link del Botón</Label>
                <Input
                  id="buttonLink"
                  name="buttonLink"
                  defaultValue={editingSlide?.buttonLink || ""}
                  placeholder="#contacto o /ruta"
                />
              </div>

              <div>
                <Label htmlFor="displayOrder">Orden de Visualización</Label>
                <Input
                  id="displayOrder"
                  name="displayOrder"
                  type="number"
                  defaultValue={editingSlide?.displayOrder || 0}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  name="isActive"
                  defaultChecked={editingSlide?.isActive ?? true}
                />
                <Label htmlFor="isActive">Slide Activo</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingSlide ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
