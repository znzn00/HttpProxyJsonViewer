import socket
import ssl
import asyncio
import _thread as thread
import re

prohibited = [
    'cdn.mozilla.net',
    'googleapis.com',
    'mozilla.com',
    'mozilla.org'
]

class ProxyServer:
    def __init__(self,host='127.0.0.1', port=3123, max_conn=50, max_data_recv=8192) -> None:
        self._host = host
        self._port = port
        self._max_data_recv = max_data_recv
        self._max_conn = max_conn
        self._running = False
        self.socket = None

    def proxy_thread(self, conn: socket.socket, client_addr):
        request = conn.recv(self._max_data_recv)
        first_line = request.split(b'\n')[0]

        if len(first_line)==0:
            return

        url = first_line.split(b' ')[1]
        
        result = re.match("^((.+?):\\/\\/)?(.*?)(:(\\d+))?(\\/.*)?$", url.decode('utf-8'))
        resultGroups = result.groups()

        protocol = (resultGroups[1] if resultGroups[1] else "http").lower()
        webserver = resultGroups[2]
        for pro in prohibited:
            if webserver is not None and webserver.endswith(pro):
                return
            
        print(client_addr,"Request",first_line)
        verb = first_line.split(b' ')[0]

        port = int(resultGroups[4] if resultGroups[4] else 80)

        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
           
            if port==443:
                # TODO: HTTPS Proxy
                return
            s.connect((webserver, port))
            s.send(request)

            while data := s.recv(self._max_data_recv):
                conn.send(data)


            print(client_addr,"Request Ended",first_line)
        except (socket.error):
            print(client_addr,"Peer Reset",first_line)
        finally:
            if s:
                s.close()
            if conn:
                conn.close()

    def _start(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._running = True
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.socket.bind((self._host, self._port))
            self.socket.listen(self._max_conn)
        except socket.error as E:
            if self.socket:
                self.socket.close()
            print ("Could not open socket:", E)
        print(f"Proxy server started on {self._host}:{self._port}")
        while self._running:
            conn, client_addr = self.socket.accept()
            thread.start_new_thread(self.proxy_thread, (conn, client_addr))
        
        self.socket.close()
        self.socket= None
    
    def run(self, run_async=True):
        if self.socket is None:
            if run_async:
                thread.start_new_thread(self._start, ())
            else:
                self._start()
            return
        print("Proxy server is already running.")
    
    def stop(self):
        if self._running:
            print(f"Stopping proxy server {self._host}:{self._port}")
            self._running = False
            return
        print(f"Proxy server isn't running.")

async def main():
    proxy = ProxyServer()
    try:
        proxy.run()
        while True:
            input()
    except KeyboardInterrupt:
        print("Stopping server.")
        proxy.stop()

if __name__=="__main__":
    asyncio.run(main())
    
    