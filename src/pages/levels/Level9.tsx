import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

const Level9 = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 cyber-gradient">Level 9: Cloud Security & Misconfigurations</h1>
            <p className="text-xl text-muted-foreground">Explore the new attack surface: The Cloud.</p>
          </div>
          <div className="sticky top-20 z-40 glass border border-border/50 rounded-lg p-1 mb-8">
            <div className="flex space-x-1">
              {[{ id: "overview", label: "1. Overview: The Cloud Frontier" }, { id: "offensive", label: "2. Offensive Ops" }, { id: "defensive", label: "3. Defensive Ops" }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          {activeTab === "overview" && (
            <div className="space-y-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>The Cloud Frontier</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    The shift to cloud infrastructure (AWS, Azure, GCP) introduces new types of vulnerabilities, primarily focusing on misconfigurations.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border border-blue-500/50 rounded-lg">
                      <div className="text-blue-400 font-medium mb-2">Cloud Provider Responsibility</div>
                      <ul className="text-sm space-y-1">
                        <li>• Physical security</li>
                        <li>• Infrastructure security</li>
                        <li>• Service availability</li>
                        <li>• Hypervisor patching</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-orange-500/50 rounded-lg">
                      <div className="text-orange-400 font-medium mb-2">Customer Responsibility</div>
                      <ul className="text-sm space-y-1">
                        <li>• IAM configuration</li>
                        <li>• Data encryption</li>
                        <li>• Network security</li>
                        <li>• Access policies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "offensive" && (
            <div className="space-y-8">
              <Card className="glass border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400">Exploiting the Cloud</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Leaky S3 Bucket</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/50 border border-green-500/50 rounded-lg font-mono text-sm">
                        <span className="text-green-400">$ aws s3 ls s3://</span>
                        <input 
                          id="s3-input"
                          className="bg-transparent border-none outline-none text-green-400"
                          placeholder="breachlabs-backup"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && (e.target as HTMLInputElement).value === 'breachlabs-backup') {
                              (document.getElementById('s3-output') as HTMLElement).style.display = 'block';
                            }
                          }}
                        />
                      </div>
                      <div id="s3-output" style={{display: 'none'}} className="p-4 bg-black/50 border border-red-500/50 rounded-lg font-mono text-sm text-red-400">
                        2024-01-15 12:34:56        524288 db_backup.sql<br/>
                        2024-01-15 12:35:12         98765 credentials.csv<br/>
                        2024-01-15 12:35:18        156789 customer_data.xlsx<br/>
                        <span className="text-yellow-400">Bucket is publicly accessible!</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Metadata Service Abuse</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-black/50 border border-red-500/50 rounded-lg font-mono text-sm text-red-400">
                        $ curl http://169.254.169.254/latest/meta-data/iam/security-credentials/EC2-Admin-Role<br/>
                        <div className="text-yellow-400 mt-2">
                          {`{
  "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  "Token": "AQoDYXdzEJr...",
  "Expiration": "2024-01-15T18:00:00Z"
}`}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The metadata service provides temporary AWS credentials. If the EC2 instance has powerful IAM permissions, attackers can steal them.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "defensive" && (
            <div className="space-y-8">
              <Card className="glass border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Securing the Cloud</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Fixing S3 Bucket Policy</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-card/50 border border-red-500/50 rounded-lg font-mono text-sm">
                        <div className="text-red-400"># Current (Vulnerable) Policy:</div>
                        <div className="text-white">
                          {`{
  "Principal": "`}
                          <select 
                            className="bg-red-500/20 border border-red-500/50 rounded px-1"
                            onChange={(e) => {
                              if (e.target.value === 'arn:aws:iam::123456789012:root') {
                                document.getElementById('s3-policy-msg').style.display = 'block';
                              }
                            }}
                          >
                            <option value="*">*</option>
                            <option value="arn:aws:iam::123456789012:root">arn:aws:iam::123456789012:root</option>
                          </select>
                          {`",
  "Action": "`}
                          <select 
                            className="bg-red-500/20 border border-red-500/50 rounded px-1"
                          >
                            <option value="s3:*">s3:*</option>
                            <option value="s3:GetObject">s3:GetObject</option>
                          </select>
                          {`"
}`}
                        </div>
                      </div>
                      <div id="s3-policy-msg" style={{display: 'none'}} className="p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm">
                        ✅ Correct! Restrict Principal to specific AWS accounts instead of "*" (everyone).
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">CloudTrail Log Analysis</h3>
                    <div className="p-4 bg-card/50 border border-border/50 rounded-lg font-mono text-sm space-y-2">
                      <div className="text-muted-foreground">AWS CloudTrail Events:</div>
                      <div className="cursor-pointer hover:bg-blue-500/20 p-1 rounded">2024-01-15 14:20:15 - DescribeInstances - user:alice - 10.0.1.100</div>
                      <div className="cursor-pointer hover:bg-blue-500/20 p-1 rounded">2024-01-15 14:21:03 - CreateSecurityGroup - user:bob - 10.0.1.50</div>
                      <div 
                        className="cursor-pointer hover:bg-red-500/20 p-1 rounded text-yellow-400"
                        onClick={(e) => {
                          (e.target as HTMLElement).classList.add('bg-red-500/50');
                          const msg = document.getElementById('cloudtrail-msg');
                          if (msg) msg.style.display = 'block';
                        }}
                      >
                        2024-01-15 14:22:18 - ListUsers → CreateAccessKey - user:charlie - 198.51.100.42
                      </div>
                      <div className="cursor-pointer hover:bg-blue-500/20 p-1 rounded">2024-01-15 14:23:45 - GetBucketPolicy - user:alice - 10.0.1.100</div>
                    </div>
                    <div id="cloudtrail-msg" style={{display: 'none'}} className="mt-2 p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm">
                      ✅ Suspicious! ListUsers followed by CreateAccessKey from external IP indicates backdoor user creation.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex justify-between items-center py-8">
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/level/8" className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" />Previous</Link></Button>
            <Button asChild variant="cyber-ghost" size="lg"><Link to="/" className="flex items-center gap-2"><Home className="w-4 h-4" />Home</Link></Button>
            <Button asChild variant="cyber" size="lg"><Link to="/level/10" className="flex items-center gap-2">Next<ChevronRight className="w-4 h-4" /></Link></Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level9;