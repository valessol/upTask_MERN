export const newProjectForm = [
  {
    id: "name",
    element: "input",
    type: "text",
    placeholder: "Diseño de logotipo",
    label: "Nombre del proyecto",
  },
  {
    id: "description",
    element: "textarea",
    placeholder: "Diseño de logotipo",
    label: "Descripción",
  },
  {
    id: "finishDate",
    element: "input",
    type: "date",
    label: "Fecha de entrega",
  },
  {
    id: "client",
    element: "input",
    type: "text",
    placeholder: "John Doe",
    label: "Nombre del cliente",
  },
];

export const newTaskForm = [
  {
    id: "name",
    element: "input",
    type: "text",
    placeholder: "Definición de paleta de colores",
    label: "Nombre de la tarea",
  },
  {
    id: "description",
    element: "textarea",
    type: "textarea",
    placeholder: "Seleccionar la paleta adecuada para la marca",
    label: "Descripción",
  },
  {
    id: "finishDate",
    element: "input",
    type: "date",
    label: "Fecha de entrega",
  },
  {
    id: "priority",
    element: "select",
    label: "Prioridad",
    options: ["Baja", "Media", "Alta"],
  },
];

export const newCollaboratorForm = [
  {
    id: "email",
    element: "input",
    type: "email",
    placeholder: "example@example.com",
    label: "Email del colaborador",
  },
];
