import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../component/layout";
import apiRequest from "../../../util/apiRequest";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';


export default function PortalDoAlunoNaTurma({ listaAlunos: listaAlunos, error }) {
  const [aluno, setAluno] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (listaAlunos) {
      setAluno(listaAlunos);
    }
    console.log(listaAlunos);
    console.log(error);
    //erros
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Galdi</title>
        <meta name="description" content="Generated by meio a meio" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <p className={styles.description}>Alunos</p>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Turma</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aluno.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {row.nome_completo}
                    </TableCell>
                    <TableCell align="center">{row.nome_turma || ""}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        component="label"
                        onClick={() => apiRequest.post("turma/" + row.turma_id, { ...row })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="outlined"
              onClick={() => router.push("cadastro")}
              sx={{ alignSelf: "center" }}
            >
              Cadastrar
            </Button>
          </div>
        </main>
      </Layout>
    </div>
  );
}
export async function getServerSideProps() {
  const resAlunos = await apiRequest.get("turma/"); //localhost:8080/turma/id/alunos
  if (!resAlunos || !resAlunos.data) {
    return { props: { error: "Falha ao carregar conteúdo" } };
  }

  return {
    props: {
      listaAlunos: resAlunos.data,
      error: null,
    },
  };
}
