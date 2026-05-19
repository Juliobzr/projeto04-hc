import { apiFetch } from "@/lib/apiClient";

export async function listarPacientes() {
  const res = await apiFetch(
    "/api/pacientes"
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.erro || "Erro ao buscar pacientes"
    );
  }

  return data;
}

export async function buscarPaciente(
  id: string
) {
  const res = await apiFetch(
    `/api/pacientes/${id}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.erro || "Erro ao buscar paciente"
    );
  }

  return data;
}

export async function criarPaciente(
  paciente: any
) {
  const res = await apiFetch(
    "/api/pacientes",
    {
      method: "POST",
      body: JSON.stringify(paciente),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.erro || "Erro ao criar paciente"
    );
  }

  return data;
}

export async function atualizarPaciente(
  id: string,
  paciente: any
) {
  const res = await apiFetch(
    `/api/pacientes/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(paciente),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.erro || "Erro ao atualizar paciente"
    );
  }

  return data;
}

export async function excluirPaciente(
  id: string
) {
  const res = await apiFetch(
    `/api/pacientes/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const data = await res.json();

    throw new Error(
      data.erro || "Erro ao excluir paciente"
    );
  }
}