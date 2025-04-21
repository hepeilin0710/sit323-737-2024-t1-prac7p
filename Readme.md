## 🛠️ How to Run

### 1. Build & Push Docker Image

```bash
docker build -t your-dockerhub-username/calculator .
docker push your-dockerhub-username/calculator
```
### 2. Deploy to Kubernetes
```bash
# Apply MongoDB secret (for credentials)
kubectl apply -f mongo-secret.yaml

# Create MongoDB persistent volume
kubectl apply -f mongo-pvc.yaml

# Deploy MongoDB
kubectl apply -f mongo-deployment.yaml

# Deploy Calculator Microservice
kubectl apply -f calculator-deployment.yaml
```

### 3. Test the Service 

```bash
# Forward local port 8080 to service port 80
kubectl port-forward service/calculator-service 8080:80
```

Then test with Postman or curl:

```
POST http://localhost:8080/add
```

### 4. View Data in MongoDB Compass

```bash

kubectl port-forward service/mongo-service 27018:27017
```

Connect using MongoDB Compass:

```
mongodb://mongouser:mongopass@localhost:27018
```




