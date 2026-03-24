import { NodeSSH } from "node-ssh"

let sshClient: NodeSSH | null = null

export async function getSSH(): Promise<NodeSSH> {
  if (sshClient?.isConnected()) return sshClient

  const ssh = new NodeSSH()
  await ssh.connect({
    host: process.env.HZ_SSH_HOST ?? "49.13.206.154",
    username: process.env.HZ_SSH_USER ?? "root",
    privateKey: process.env.HZ_SSH_KEY?.replace(/\\n/g, "\n"),
    readyTimeout: 10000,
  })

  sshClient = ssh
  return ssh
}

export async function runSSH(command: string): Promise<string> {
  const ssh = await getSSH()
  const result = await ssh.execCommand(command)
  if (result.stderr && !result.stdout) throw new Error(result.stderr)
  return result.stdout.trim()
}

export async function disconnectSSH(): Promise<void> {
  if (sshClient?.isConnected()) {
    sshClient.dispose()
    sshClient = null
  }
}
